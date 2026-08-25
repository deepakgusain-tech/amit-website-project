"use server";

import { prisma } from "../db/prisma-helper";
import { upcommingEventSchema } from "../validators";
import { formatError, omitTimestamps } from "../utils";
import { UpcommingEvent } from "../types";
import { z } from "zod";

type ActionResponse = {
    success: boolean;
    message: string;
};

export async function getUpcommingEvents(): Promise<any> {
    try {
        const upcommingEvents = await prisma.upcommingEvents.findMany({
            orderBy: { createdAt: "desc" },
            include: { images: { orderBy: { sortOrder: "asc" } } },
        });

        return upcommingEvents.map(({ images, ...event }) => ({
            ...event,
            images: images.map((image) => image.url),
        }));
    } catch {
        return [];
    }
}

export async function createUpcommingEvent(data: z.infer<typeof upcommingEventSchema>): Promise<ActionResponse> {
    try {
        const upcommingEvent = upcommingEventSchema.parse(data);

        console.log("Creating upcomming event:", upcommingEvent);

        await prisma.upcommingEvents.create({
            data: {
                title: upcommingEvent.title,
                description: upcommingEvent.description,
                category: upcommingEvent.category,
                imageUrl: upcommingEvent.images[0] ?? (typeof upcommingEvent.imageUrl === "string" ? upcommingEvent.imageUrl : null),
                images: {
                    create: upcommingEvent.images.map((url, sortOrder) => ({ url, sortOrder })),
                },
                eventDate: upcommingEvent.eventDate,
                startTime: upcommingEvent.startTime,
                endTime: upcommingEvent.endTime,
                location: upcommingEvent.location,
                showSaveTheDate: upcommingEvent.showSaveTheDate,
                saveTheDateText: upcommingEvent.saveTheDateText,
                status: upcommingEvent.status,
            },
        });

        return {
            success: true,
            message: "Upcoming event created successfully",
        };
    } catch (error) {
        return {
            success: false,
            message: formatError(error),
        };
    }
}

export async function getUpcommingEventById(id: string) {
    try {
        const upcommingEvent = await prisma.upcommingEvents.findUnique({
            where: { id },
            include: { images: { orderBy: { sortOrder: "asc" } } },
        });

        if (!upcommingEvent) {
            return {
                success: false,
                message: "Upcoming event not found",
            };
        }

        return {
            success: true,
            data: {
                ...omitTimestamps(upcommingEvent),
                images: upcommingEvent.images.map((image) => image.url),
            },
            message: "Upcoming event fetched successfully",
        };
    } catch (error) {
        return {
            success: false,
            message: formatError(error),
        };
    }
}

export async function updateUpcommingEvents(
    data: z.infer<typeof upcommingEventSchema>,
    id: string
): Promise<ActionResponse> {
    try {
        const upcommingEvent = upcommingEventSchema.parse(data);

        const imageValue = upcommingEvent.images[0] ?? (typeof upcommingEvent.imageUrl === "string" ? upcommingEvent.imageUrl : null);

        const updateData = {
            title: upcommingEvent.title,
            description: upcommingEvent.description,
            category: upcommingEvent.category,
            imageUrl: imageValue,
            eventDate: upcommingEvent.eventDate,
            startTime: upcommingEvent.startTime,
            endTime: upcommingEvent.endTime,
            location: upcommingEvent.location,
            showSaveTheDate: upcommingEvent.showSaveTheDate,
            saveTheDateText: upcommingEvent.saveTheDateText,
            status: upcommingEvent.status,
        };

        await prisma.$transaction(async (transaction) => {
            await transaction.upcommingEvents.update({
                where: { id },
                data: {
                    ...updateData,
                    images: {
                        deleteMany: {},
                        create: upcommingEvent.images.map((url, sortOrder) => ({ url, sortOrder })),
                    },
                },
            });
        });

        return {
            success: true,
            message: "Upcoming event updated successfully",
        };
    } catch (error) {
        return {
            success: false,
            message: formatError(error),
        };
    }
}


export async function deleteUpcommingEvent(id: string): Promise<ActionResponse> {
    try {
        await prisma.upcommingEvents.delete({
            where: { id },
        });

        return {
            success: true,
            message: "Upcomming Event deleted successfully",
        };
    } catch (error) {
        return {
            success: false,
            message: formatError(error),
        };
    }
}
