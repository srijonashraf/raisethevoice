class Storage {
	set = (key: string, data: any) => {
		typeof localStorage !== "undefined" &&
			localStorage.setItem(key, JSON.stringify(data));
	};

	get = (key: string): any => {
		return (
			typeof localStorage !== "undefined" &&
			JSON.parse(localStorage.getItem(key as string) ?? "null")
		);
	};

	remove = (key: string) =>
		typeof localStorage !== "undefined" && localStorage.removeItem(key);

	clear = () => typeof localStorage !== "undefined" && localStorage.clear();

	upsert = (key: string, data: any) => {
		if (typeof localStorage !== "undefined") {
			const existing = this.get(key);
			this.set(key, { ...existing, ...data });
		}
	};
}

const storage = new Storage();

export default storage;
