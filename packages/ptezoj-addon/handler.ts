import { HomeHandler } from 'hydrooj/src/handler/home'
import moment from 'moment';

async function getCountdown(payload) {
    var content = new Array();
	var dateToday = moment().format("YYYY-MM-DD");
	var dates = new Array(payload.dates);
	dates = dates[0];
	dates.forEach(function(val, ind) {
		if (content.length < payload['max_dates']) {
			if (moment(val.date).isSameOrAfter(dateToday)) {
				var diffTime = moment(val.date).diff(moment(), 'days');
				content.push({
					name: val.name,
					diff: diffTime
				})
			}
		}
	});
	payload.dates = content;
    return payload;
}

HomeHandler.prototype.getCountdown = async (domainId, payload) => {
    return await getCountdown(payload);
}

async function getBanner(payload) {
    var content = new Array();
	var pics = new Array(payload.pics);
	pics = pics[0];
	pics.forEach(function(val, ind) {
		content.push({
			pic: val.pic,
			url: val.url
		})
	});
	payload.pics = content;	
    return payload;
}

HomeHandler.prototype.geBanner = async (domainId, payload) => {
    return await getBanner(payload);
}