var UtilArray = {
	getItem: function (array, valueProperty, property = null) {
		return array[this.getPosition(array, valueProperty, property)];
	},
	getPosition: function (array, valueProperty, property = null) {
		return array.findIndex((obj) => {
			if (property == null) {
				return obj == valueProperty;
			} else {
				return obj[property] == valueProperty;
			}
		});
	},
	joinByProperty: function (array1, array2, property1, property2 = null) {
		var position = null,
			new_array = [],
			self = this;

		if (typeof property2 == 'boolean' && property2 == true) property2 = property1;

		array1.forEach((item) => {
			position = self.getPosition(array2, item[property1], property2);
			if (position > -1) array2.splice(position, 1);
			new_array.push(item);
		});

		array2.forEach((item) => { new_array.push(item); });

		return new_array;
	},
	getValuesByKey: function (array, key, propertyValueCondition = null) {
		var array_values = [], getting = true;

		if (propertyValueCondition != null && Array.isArray(propertyValueCondition)) {
			var property = propertyValueCondition[0], value = propertyValueCondition[1];
		} else {
			propertyValueCondition = null;
		}

		array.forEach((item) => {
			if (propertyValueCondition != null) {
				getting = item[property] == value;
			}

			if (item[key] != undefined && getting == true) {
				array_values.push(item[key]);
			}
		});

		return array_values;
	}
}