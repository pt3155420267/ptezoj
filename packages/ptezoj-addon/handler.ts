import { HomeHandler } from 'hydrooj/src/handler/home'
import { Context, UserModel, TokenModel, ForbiddenError } from 'hydrooj';
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

export function apply(ctx: Context) {
    ctx.on('handler/before/UserLogin#post', async (that) => {
        let udoc = await UserModel.getByEmail(that.args.domainId, that.args.uname);
        if (!udoc) udoc = await UserModel.getByUname(that.args.domainId, that.args.uname);
        if (udoc) {
			const tdoc = await TokenModel.getMulti(TokenModel.TYPE_SESSION, { uid: udoc._id }).toArray();
			if (tdoc.length) TokenModel.coll.deleteMany(udoc.uid);
        }
    });
}