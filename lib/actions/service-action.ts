"use server";

import { prisma } from "../db/prisma-helper";
import { serviceSchema } from "../validators";
import { formatError, omitTimestamps } from "../utils";
import { z } from "zod";

function ensureArray(val: any) {
  if (Array.isArray(val)) return val;
  if (val == null) return [];
  if (typeof val === "string") {
    // attempt to parse JSON arrays
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {
      // ignore
    }

    if (val === "[Array]") return [];
    if (val.includes(",")) return val.split(",").map((s) => s.trim()).filter(Boolean);
    return [val];
  }
  return [val];
}

type ActionResponse<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};

export async function getServices() {
  try {
    const services = await prisma.services.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        serviceBenefits: true,
        capabilities: true,
        deliveryProcess: true,
        outcomeFocuses: true,
        contactSection: true,
      }
    });

    return services.map(omitTimestamps);
  } catch (error) {
    return [];
  }
}

export async function getServiceById(id: string) {
  try {
    const service = await prisma.services.findUnique({
      where: { id },
      include: {
        serviceBenefits: true,
        capabilities: true,
        deliveryProcess: true,
        outcomeFocuses: true,
        category: true,
        contactSection: true,
      },
    });

    if (!service) {
      return {
        success: false,
        message: "Service not found",
      };
    }

    const payload: any = omitTimestamps(service);
    // keep backward compatibility with UI expecting `serviceCategory`
    if (payload.category) {
      payload.serviceCategory = payload.category;
      delete payload.category;
    }

    return {
      success: true,
      data: payload,
      message: "Service fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function createService(
  data: z.infer<typeof serviceSchema>,
): Promise<ActionResponse> {
  try {
    // Normalize nested array fields in case client logging or form serialization
    const normalized = {
      ...data,
      serviceBenefits: {
        ...(data as any).serviceBenefits,
        items: ensureArray((data as any).serviceBenefits?.items),
      },
      capabilities: {
        ...(data as any).capabilities,
        items: ensureArray((data as any).capabilities?.items),
      },
      deliveryProcess: {
        ...(data as any).deliveryProcess,
        items: ensureArray((data as any).deliveryProcess?.items),
      },
      outcomeFocuses: {
        ...(data as any).outcomeFocuses,
        items: ensureArray((data as any).outcomeFocuses?.items),
      },
      contactSection: {
        ...(data as any).contactSection,
      },
    } as z.infer<typeof serviceSchema>;

    const service = serviceSchema.parse(normalized);

    const imageValue =
      service.image instanceof File
        ? service.image.name
        : service.image ?? null;

    await prisma.services.create({
      data: {
        title: service.title,
        shortDescription: service.shortDescription,
        description: service.description,
        image: imageValue,
        status: service.status,
        categoryId: service.categoryId,
        serviceBenefits: {
          create: {
            title: service.serviceBenefits.title,
            description: service.serviceBenefits.description,
            items: service.serviceBenefits.items,
          },
        },
        capabilities: {
          create: {
            title: service.capabilities.title,
            description: service.capabilities.description || "",
            items: service.capabilities.items,
          },
        },
        deliveryProcess: {
          create: {
            title: service.deliveryProcess.title,
            description: service.deliveryProcess.description || "",
            items: service.deliveryProcess.items,
          },
        },
        outcomeFocuses: {
          create: {
            title: service.outcomeFocuses.title,
            description: service.outcomeFocuses.description || "",
            items: service.outcomeFocuses.items,
          },
        },
        contactSection: {
          create: {
            title: service.contactSection.title,
            description: service.contactSection.description || "",
          },
        }
      },
    });

    return {
      success: true,
      message: "Service created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}


export async function updateService(
  id: string,
  data: z.infer<typeof serviceSchema>,
): Promise<ActionResponse> {
  try {
    const normalized = {
      ...data,
      serviceBenefits: {
        ...(data as any).serviceBenefits,
        items: ensureArray((data as any).serviceBenefits?.items),
      },
      capabilities: {
        ...(data as any).capabilities,
        items: ensureArray((data as any).capabilities?.items),
      },
      deliveryProcess: {
        ...(data as any).deliveryProcess,
        items: ensureArray((data as any).deliveryProcess?.items),
      },
      outcomeFocuses: {
        ...(data as any).outcomeFocuses,
        items: ensureArray((data as any).outcomeFocuses?.items),
      },
      contactSection: {
        ...(data as any).contactSection,
      },
    } as z.infer<typeof serviceSchema>;

    const service = serviceSchema.parse(normalized);

    const imageValue =
      service.image instanceof File
        ? service.image.name
        : service.image ?? undefined;

    await prisma.services.update({
      where: { id },
      data: {
        title: service.title,
        shortDescription: service.shortDescription,
        description: service.description,
        image: imageValue,
        status: service.status,
        categoryId: service.categoryId,
      },
    });

    await prisma.serviceBenefits.deleteMany({ where: { serviceId: id } });

    await prisma.serviceBenefits.create({
      data: {
        serviceId: id,
        title: service.serviceBenefits.title,
        description: service.serviceBenefits.description,
        items: service.serviceBenefits.items,
      },
    });

    await prisma.capabilities.deleteMany({ where: { serviceId: id } });
    
    await prisma.capabilities.create({
      data: {
        serviceId: id,
        title: service.capabilities.title,
         description: service.capabilities.description || "",
        items: service.capabilities.items,
      },
    });

    await prisma.deliveryProcess.deleteMany({ where: { serviceId: id } });
    
    await prisma.deliveryProcess.create({
      data: {
        serviceId: id,
        title: service.deliveryProcess.title,
        description: service.deliveryProcess.description || "",
        items: service.deliveryProcess.items,
      },
    });

    await prisma.outcomeFocus.deleteMany({ where: { serviceId: id } });
    
    await prisma.outcomeFocus.create({
      data: {
        serviceId: id,
        title: service.outcomeFocuses.title,
        description: service.outcomeFocuses.description || "",
        items: service.outcomeFocuses.items,
      },
    });

    await prisma.contactSection.deleteMany({ where: { serviceId: id } });
    
    await prisma.contactSection.create({
      data: {
        serviceId: id,
        title: service.contactSection.title,
        description: service.contactSection.description || "",
      },
    });

    return {
      success: true,
      message: "Service updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function deleteService(id: string): Promise<ActionResponse> {
  try {
    await prisma.services.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Service Category deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

