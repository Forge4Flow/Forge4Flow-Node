import Authorization from "./Authorization";
import Feature from "./Feature";
import PricingTier from "./PricingTier";
import User from "./User";
import Forge4FlowClient from "../Forge4FlowClient";
import Warrant from "./WarrantModule";
import { ListFeatureOptions } from "../types/Feature";
import { ObjectType } from "../types/ObjectType";
import { ListPricingTierOptions } from "../types/PricingTier";
import {
  CreateTenantParams,
  ListTenantOptions,
  UpdateTenantParams,
} from "../types/Tenant";
import { ListUserOptions } from "../types/User";
import { Context, WarrantObject } from "../types/Warrant";

export default class Tenant implements WarrantObject {
  // Tenant properties
  tenantId: string;
  name?: string;
  createdAt?: Date;

  constructor(tenantId: string, name?: string, createdAt?: Date) {
    this.tenantId = tenantId;
    this.name = name;
    this.createdAt = createdAt;
  }

  //
  // Static methods
  //
  public static async create(tenant: CreateTenantParams = {}): Promise<Tenant> {
    try {
      const response = await Forge4FlowClient.httpClient.post({
        url: "/v1/tenants",
        data: tenant,
      });

      return new Tenant(response.tenantId, response.name, response.createdAt);
    } catch (e) {
      throw e;
    }
  }

  public static async batchCreate(
    tenants: CreateTenantParams[]
  ): Promise<Tenant[]> {
    try {
      const response = await Forge4FlowClient.httpClient.post({
        url: "/v1/tenants",
        data: tenants,
      });

      return response.map(
        (tenant: Tenant) =>
          new Tenant(response.tenantId, response.name, response.createdAt)
      );
    } catch (e) {
      throw e;
    }
  }

  public static async get(tenantId: string): Promise<Tenant> {
    try {
      const response = await Forge4FlowClient.httpClient.get({
        url: `/v1/tenants/${tenantId}`,
      });

      return new Tenant(response.tenantId, response.name, response.createdAt);
    } catch (e) {
      throw e;
    }
  }

  public static async update(
    tenantId: string,
    tenant: UpdateTenantParams
  ): Promise<Tenant> {
    try {
      const response = await Forge4FlowClient.httpClient.put({
        url: `/v1/tenants/${tenantId}`,
        data: tenant,
      });

      return new Tenant(response.tenantId, response.name, response.createdAt);
    } catch (e) {
      throw e;
    }
  }

  public static async delete(tenantId: string): Promise<void> {
    try {
      return await Forge4FlowClient.httpClient.delete({
        url: `/v1/tenants/${tenantId}`,
      });
    } catch (e) {
      throw e;
    }
  }

  public static async listTenants(
    listOptions: ListTenantOptions = {}
  ): Promise<Tenant[]> {
    try {
      const response = await Forge4FlowClient.httpClient.get({
        url: "/v1/tenants",
        params: listOptions,
      });

      return response.map(
        (tenant: Tenant) =>
          new Tenant(tenant.tenantId, tenant.name, tenant.createdAt)
      );
    } catch (e) {
      throw e;
    }
  }

  public static async listTenantsForUser(
    userId: string,
    listOptions: ListTenantOptions = {}
  ): Promise<Tenant[]> {
    try {
      const response = await Forge4FlowClient.httpClient.get({
        url: `/v1/users/${userId}/tenants`,
        params: listOptions,
      });

      return response.map(
        (tenant: Tenant) =>
          new Tenant(tenant.tenantId, tenant.name, tenant.createdAt)
      );
    } catch (e) {
      throw e;
    }
  }

  //
  // Instance methods
  //
  public async listUsers(listOptions: ListUserOptions = {}): Promise<User[]> {
    return User.listUsersForTenant(this.tenantId, listOptions);
  }

  public async assignUser(userId: string, role: string): Promise<Warrant> {
    return User.assignUserToTenant(this.tenantId, userId, role);
  }

  public async removeUser(userId: string, role: string): Promise<void> {
    return User.removeUserFromTenant(this.tenantId, userId, role);
  }

  public async listPricingTiers(
    listOptions: ListPricingTierOptions = {}
  ): Promise<PricingTier[]> {
    return PricingTier.listPricingTiersForTenant(this.tenantId, listOptions);
  }

  public async assignPricingTier(pricingTierId: string): Promise<Warrant> {
    return PricingTier.assignPricingTierToTenant(this.tenantId, pricingTierId);
  }

  public async removePricingTier(pricingTierId: string): Promise<void> {
    return PricingTier.removePricingTierFromTenant(
      this.tenantId,
      pricingTierId
    );
  }

  public async listFeatures(
    listOptions: ListFeatureOptions = {}
  ): Promise<Feature[]> {
    return Feature.listFeaturesForTenant(this.tenantId, listOptions);
  }

  public async assignFeature(featureId: string): Promise<Warrant> {
    return Feature.assignFeatureToTenant(this.tenantId, featureId);
  }

  public async removeFeature(featureId: string): Promise<void> {
    return Feature.removeFeatureFromTenant(this.tenantId, featureId);
  }

  public async hasFeature(
    featureId: string,
    context: Context = {}
  ): Promise<boolean> {
    return Authorization.hasFeature({
      featureId: featureId,
      subject: { objectType: ObjectType.Tenant, objectId: this.tenantId },
      context: context,
    });
  }

  // WarrantObject methods
  public getObjectType(): string {
    return ObjectType.Tenant;
  }

  public getObjectId(): string {
    return this.tenantId;
  }
}
