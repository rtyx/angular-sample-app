import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

class FORMATS {
	public static readonly TODAY = 'h:mm a';
	public static readonly TODAY_ABBREVIATED = 'h:mm';
	public static readonly THIS_WEEK = 'EEEE';
	public static readonly THIS_WEEK_ABBREVIATED = 'EEE';
	public static readonly THIS_YEAR = 'MMMM d';
	public static readonly THIS_YEAR_ABBREVIATED = 'MMM d';
	public static readonly OLD_DATE = 'EEEE, MMMM d, y';
	public static readonly OLD_DATE_ABBREVIATED = 'M/d/yy';
}

@Pipe({
	name: 'recentDate'
})
export class RecentDatePipe extends DatePipe implements PipeTransform {
	public transform(value: any, args?: any): any {
		try {
			if (moment(value).isSame(new Date(Date.now()), 'day')) {
				if (args) {
					return super.transform(value, FORMATS.TODAY_ABBREVIATED);
				} else {
					return super.transform(value, FORMATS.TODAY);
				}
			} else if (moment(value).isSame(new Date(Date.now()), 'week')) {
				if (args) {
					return super.transform(value, FORMATS.THIS_WEEK_ABBREVIATED);
				} else {
					return super.transform(value, FORMATS.THIS_WEEK);
				}
			} else if (moment(value).isSame(new Date(Date.now()), 'year')) {
				if (args) {
					return super.transform(value, FORMATS.THIS_YEAR_ABBREVIATED);
				} else {
					return super.transform(value, FORMATS.THIS_YEAR);
				}
			} else {
				if (args) {
					return super.transform(value, FORMATS.OLD_DATE_ABBREVIATED);
				} else {
					return super.transform(value, FORMATS.OLD_DATE);
				}
			}
		} catch (e) {
			console.error(e);
			return super.transform(value);
		}
	}
}
