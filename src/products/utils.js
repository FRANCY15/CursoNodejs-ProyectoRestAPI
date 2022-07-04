

const excelGenerator = (products, name, res) => {
    //se requiere el paquete dentro de la función, para que se cargue unicamnte cuando se ejecute la función, para generar archivos de excel y reportes. 
    const xl = require('excel4node');

    products = products.map((product) => {
        let id = product._id.toString();
        delete product._id;
        return {
            id,
            ...product
        }
    });

    let wb = new xl.Workbook();
    let ws = wb.addWorksheet('inventario');

    for(let i = 1; i <= products.length; i++){
        for(let j = 1; j <= Object.values(products[0]).length; j++){
            let data = Object.values(products[i-1])[j-1];
            //especificamos el tipo de valor para enviar a la celda.
            if(typeof data === 'string'){
                ws.cell(i,j).toString(data)
            }else{
                ws.cell(i,j).number(data);
            }
        }
        wb.write(`${name}.xls`, res)
    }
}

module.exports.ProductsUtils = {
    excelGenerator
}