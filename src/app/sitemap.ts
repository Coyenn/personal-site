export default () => {
	const routes = ["", "/writing", "/colophon"].map((route) => ({
		url: `https://tim-ritter.com${route}`,
		lastModified: new Date().toISOString().split("T")[0],
	}));

	return [...routes];
};
