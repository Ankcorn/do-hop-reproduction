import { DurableObject } from 'cloudflare:workers';

export class MyDurableObject extends DurableObject {
	async fetch(request: Request): Promise<Response> {
		return new Response('Hello from MyDurableObject!');
	}
}

export class Project extends DurableObject<Env> {
	async fetch(request: Request): Promise<Response> {
		const id = this.env.CONTAINER.idFromName('foo');
		const stub = this.env.CONTAINER.get(id);
		console.log('stub', stub);
		const req = new Request('https://example.com')
		return stub.fetch(req);
	}
}

export class Container extends DurableObject<Env> {
	async fetch(request: Request): Promise<Response> {
		return fetch(request)
	}
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const id: DurableObjectId = env.PROJECT.idFromName('foo');
		const stub = env.PROJECT.get(id);
		console.log('hi', id)
		const greeting = await stub.fetch(request);
		return greeting;
	},
} satisfies ExportedHandler<Env>;
