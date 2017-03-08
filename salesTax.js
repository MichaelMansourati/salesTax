/*
for function calculateSalesTax
  sum sales for each index in cSD array
  find relevant taxrate for company location
  salesTax = Totalsales/taxrate

*/



var salesTaxRates = {
  AB: 0.05,
  BC: 0.12,
  SK: 0.10
};

var companySalesData = [
  {
    name: "Telus",
    province: "BC",
    sales: [ 100, 200, 400 ]
  },
  {
    name: "Bombardier",
    province: "AB",
    sales: [ 80, 20, 10, 100, 90, 500 ]
  },
  {
    name: "Telus",
    province: "SK",
    sales: [ 500, 100 ]
  }
];

var FinalSalesAndTaxes = {}

function calculateSalesTax(salesData, taxRates) {
  for (var i = 0; i < companySalesData.length; i++) {
    var company = companySalesData[i];
    var subtotalSalesCalc = company.sales.reduce((a, b) => a + b, 0);
    company.subtotalSales = subtotalSalesCalc;

    var relevantProvince = company.province;
    var relevantTaxRates = salesTaxRates[relevantProvince];
    company.subtotalTaxes = (company.subtotalSales * relevantTaxRates);

    if (FinalSalesAndTaxes[company.name]) {
      FinalSalesAndTaxes[company.name].totalSales += company.subtotalSales;
      FinalSalesAndTaxes[company.name].totalTaxes += company.subtotalTaxes;
    } else {
      FinalSalesAndTaxes[company.name] = {
        totalSales: company.subtotalSales,
        totalTaxes: company.subtotalTaxes
      };
      //FinalSalesAndTaxes[company.name].totalSales = company.subtotalSales;
      //FinalSalesAndTaxes[company.name].totalTaxes = company.subtotalTaxes;
    }
  }
  return FinalSalesAndTaxes;
}

var results = calculateSalesTax(companySalesData, salesTaxRates);

console.log(results);

/* Expected Results:
{
  Telus: {
    totalSales: 1300
    totalTaxes: 144
  },
  Bombardier: {
    totalSales: 800,
    totalTaxes: 40
  }
}
*/