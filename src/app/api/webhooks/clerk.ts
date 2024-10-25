// src/app/api/webhooks/clerk
import { prisma } from '@/config/prisma';
import type { WebhookEvent, UserJSON } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        // Parse the Clerk Webhook event
        const evt = (await req.json()) as WebhookEvent;

        const { id: clerkUserId, first_name, last_name, email_addresses }: any = evt.data;
        const email = email_addresses[0].email_address
        if (!clerkUserId)
            return NextResponse.json(
                { error: 'No user ID provided' },
                { status: 400 },
            );

        // Create or delete a user in the database based on the Clerk Webhook event
        let user = null;
        switch (evt.type) {
            case 'user.created': {
                user = await prisma.user.upsert({
                    where: {
                        clerkUserId,
                    },
                    update: {
                        clerkUserId,
                    },
                    create: {
                        clerkUserId,
                        name: first_name + ' ' + last_name,
                        email
                    },
                });
                break;
            }
            case 'user.deleted': {
                user = await prisma.user.delete({
                    where: {
                        clerkUserId,
                    },
                });
                break;
            }
            default:
                break;
        }

        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}