
const input = require('./input')
const sharp = require('sharp');
const fs = require('fs')

const getpaymentBeneficiaryDetails = function(req,res){
    console.log(input.input.payBeneficiaries)
    let data = input.input.payBeneficiaries
    let map = {};
    for(let x of data){
        if(!map[x.beneficiaryPayId]){
            map[x.beneficiaryPayId] = {
                parentBenePayId:x.parentBenePayId,
                businessName : x.beneficiary.businessName
            }
        }
    }
    let org =[];

    for(let x of data){
        let result = [];
        let payId = x.beneficiaryPayId;
        getOrgHierarchy(payId,result,map)
       // console.log(result)
        let d = {
            orgHierarchy:result
        }
        org.push(d)
    }


   
    return res.status(200).send(org);
}

function getOrgHierarchy(payId,arr,map){
    let data = map[payId];
    if(data.parentBenePayId.length!=0){
        getOrgHierarchy(data.parentBenePayId,arr,map);
    }
    arr.push(data.businessName);
    
}


function imageProcessor(req,res){
    const imageFile = req.body.imageFile;
    const processedImage = sharp(imageFile).resize(300, 300).toFormat('jpeg').toBuffer();
  
    fs.writeFile('processed-image.jpg', processedImage, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send('Image processed successfully.');
      }
    });
}

module.exports = {
    getpaymentBeneficiaryDetails: getpaymentBeneficiaryDetails,
    imageProcessor:imageProcessor
}