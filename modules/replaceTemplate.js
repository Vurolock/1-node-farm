module.exports = (template, product) => {
	let output = template
								.replace(/%productName%/g, product.productName)
								.replace(/%image%/g, product.image)
								.replace(/%price%/g, product.price)
								.replace(/%from%/g, product.from)
								.replace(/%nutrients%/g, product.nutrients)
								.replace(/%quantity%/g, product.quantity)
								.replace(/%description%/g, product.description)
								.replace(/%id%/g, product.id)
								.replace(/%productName%/g, product.productName);

	if (!product.organic) {
		output = output.replace(/%notOrganic%/g, 'not-organic');
	}
	return output;
}