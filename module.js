const nueveZeta = (csgo) => {
	const endpoint = 'https://9z.games/api/partidos'
	if (csgo) {
		return `CS:GO Hello World!`;
	}
	return `Hello World!`;
};

export default nueveZeta;
