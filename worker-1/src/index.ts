
export default {
	async fetch(request, env, ctx): Promise<Response> {
		const id: DurableObjectId = env.PROJECT.idFromName('foo');
		const stub = env.PROJECT.get(id);
		console.log('hi', id)
		const greeting = await stub.fetch(request);
		return greeting;
	},
} satisfies ExportedHandler<Env>;
