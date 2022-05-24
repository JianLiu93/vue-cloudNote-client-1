export function lastDate(dateStr) {
	let dateObj = (typeof dateStr === 'object' ? dateStr : new Date(dateStr));
	let time = dateObj.getTime();
	let now = Date.now();
	let dif = now - time;
	let str = '';

	switch(true) {
		case dif < 1000*60:
		str = '刚刚';
		break;
		case dif < 1000*3600:
		// n天前需要向下取整 floor
		str = `${Math.floor(dif/1000/60)}分钟前`;
		break;
		case dif < 1000*3600*24:
		str = `${Math.floor(dif/1000/3600)}小时前`;
		break;
		default:
		str = `${Math.floor(dif/1000/3600/24)}天前`;
	}
	return str;
}