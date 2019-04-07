/*
 * Localized default methods for the jQuery validation plugin.
 * Locale: ES_CL
 */
$.extend($.validator.methods, {
	date: function(value, element) {
	    return this.optional(element) || /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/.test(value);
	},
	number: function(value, element) {
		return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?$/.test(value);
	}
});
