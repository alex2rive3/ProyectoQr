const { Prueba } = require("../model/prueba.model");
module.exports.guardar = async (req, res) => {
    console.log(req.body)
    try {
        const prueba = await Prueba.create(req.body)
        res.json(prueba)
    } catch (error) {
        res.status(400).json(error)
    }
}











// function getCursoAlumnos(req,res){

//     Prueba.find().populate({patch: 'rutalumno'}).exec((err, cursoalumno) => {
//         if(err){
//             res.status(500).send({message:'Error de conexión a la BD'});
//         }else{
//             if(!cursoalumno){
//                 res.status(404).send({message: 'No existe el curso'});
//             }else{
//                 Curso.populate(cursoalumno, {path: 'codigocurso'}, (err, docingreso) => {
                    
//                     if(err){
//                         res.status(500).send({message: 'Error en la peticiona la BD'});
//                     }else{
//                         res.status(200).send(cursoalumno);
//                     }
//                 });
//             }
//         }
//     });
    
// }