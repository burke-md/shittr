import { PrismaClient } from "@prisma/client";

export async function createLocationAction(data) {
	const prisma = new PrismaClient({ log: ["query"] });

	try {
		const location = await prisma.locations.create({
			data: {
				latitude: data.latitude,
				longitude: data.longitude,
			},
		});
		return location;
	} catch (err) {
		const error = new Error(`Error within createLocationAction: ${err}`)
		error.code = 500;
		throw error;
	} finally {
		await prisma.$disconnect();
	}
}

export async function deleteLocationAction(data) {
	const prisma = new PrismaClient({ log: ["query"] });

	try {
		const deleteLocation = await prisma.locations.delete({
			where: {
				id: data.id,
			},
		})
		return deleteLocation;
	} catch (err) {
		const error = new Error(`Error within deleteLocationAction: ${err}`)
		error.code = 500;
		throw error;
	} finally {
		await prisma.$disconnect();
	}
}


export async function readLocationAction() {
	const prisma = new PrismaClient({ log: ["query"] });

	try {
		const locations = await prisma.locations.findMany();
		return locations;
	} catch (err) {
		const error = new Error(`Error within readLocationAction: ${err}`)
		error.code = 500;
		throw error;
	} finally {
		await prisma.$disconnect();
	}
}

export async function updateLocationAction(data) {
	const prisma = new PrismaClient({ log: ["query"] });

	try {
		const updateLocation = await prisma.locations.update({
			where: {
				id: data.id,
			},
			data: {
				latitude: data.latitude,
				longitude: data.longitude,
			},
		})
		return updateLocation
	} catch (err) {
		const error = new Error(`Error within updateLocationAction: ${err}`)
		error.code = 500;
		throw error;
	} finally {
		await prisma.$disconnect();
	}
}