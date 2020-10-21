const db = require("../db")
const Database = require("../db")

Database.then(async (db) => {
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// INSIRA O ** ID ** /////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
    const id_up = null //insira o id da tabela que deseja ALTERAR

    /*//UPDATE ÚNICO
    const uColumn = 'name', uResult = 'Lar doce lar'
    const fosterHomes = await db.all(`UPDATE fosterHomes SET "${uColumn}" = "${uResult}" WHERE id = "${id_up}"`)
    */

    if (id_up == null || id_up == undefined) {
        console.error("[!!! ERROR !!!] id = " + id_up + ", por favor insira um id no arquivo UPDATE-manual.js[8,19] para continuar!")   //ERROR! (id)
        process.on("SIGINT", () => {
            db.close()
        })
    }

    const fosterHomesItens = await db.all(`SELECT * FROM fosterHomes WHERE id = "${id_up}"`)
    const [fosterHomesItensObject] = fosterHomesItens
    await updateFosterHomes(db, fosterHomesItensObject)
})
async function updateFosterHomes(db, fosterHomesItensObject) {
    // insira o dado que deseja alterar e chame por esta variável no 'UPDATE'
    // EX: cons NEW_name = "lar doce lar"; & SET name = ' ${NEW_name}',
    const  
        NEW_lat                 = '', //latitude EX: -12.3456789
        NEW_lng                 = '', //longitude EX: 98.7654321
        NEW_name                = '', //nome do local
        NEW_about               = '', //sobre o local
        NEW_whatsapp            = '', //EX: (11) 91234-5678
        NEW_images              = ['https://comabe.ind.br/static/images/sem_foto.png'].toString(), //links p/ imgs * MAX 6 *
        NEW_instructions        = '', //instruções p/ visita
        NEW_opening_hours       = '', //EX: 12:00 as 20:00
        NEW_open_on_weekends    = ''  //0 = não, 1 = sim

    return await db.all(`UPDATE fosterHomes SET 
        lat                 = '${fosterHomesItensObject.lat             }', 
        lng                 = '${fosterHomesItensObject.lng             }',
        name                = '${fosterHomesItensObject.name            }',
        about               = '${fosterHomesItensObject.about           }',
        whatsapp            = '${fosterHomesItensObject.whatsapp        }',
        images              = '${fosterHomesItensObject.images          }',
        instructions        = '${fosterHomesItensObject.instructions    }',
        opening_hours       = '${fosterHomesItensObject.opening_hours   }',
        open_on_weekends    = '${fosterHomesItensObject.open_on_weekends}' WHERE id = " ${fosterHomesItensObject.id} "`)
}
process.on("SIGINT", () => {
    db.close()
})
//verifique se foi alterado!



/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// SÓ EXECUTE EM CASOS **ESPECÍFICOS** //////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/***SÓ RODE UMA VEZ***///WARNINGX
/* 
    $ npm run UPDATE-manual
    $ "ENTER"
        .......
        .......
        .......
        Server started
    $ "Ctrl + c"
*/










/* REFERÊNCIA
return await db.all(`UPDATE fosterHomes SET 
        lat                 = ' ${fosterHomesItensObject.lat             } ', 
        lng                 = ' ${fosterHomesItensObject.lng             } ',
        name                = ' ${fosterHomesItensObject.name            } ',
        about               = ' ${fosterHomesItensObject.about           } ',
        whatsapp            = ' ${fosterHomesItensObject.whatsapp        } ',
        images              = ' ${fosterHomesItensObject.images          } ',
        instructions        = ' ${fosterHomesItensObject.instructions    } ',
        opening_hours       = ' ${fosterHomesItensObject.opening_hours   } ',
        open_on_weekends    = ' ${fosterHomesItensObject.open_on_weekends} ' WHERE id = " ${fosterHomesItensObject.id} "`)
*/