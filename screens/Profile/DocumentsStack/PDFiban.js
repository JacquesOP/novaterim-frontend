/*
============ Import react, react native & expo modules ============ 
*/
import React from "react";
/*
============ Import redux ============ 
*/
import { useSelector } from "react-redux";
/*
============ Import components ============ 
*/
import PDFcontent from "../../../components/Profile/PDFcontent";



export default function PDFiban(navigation) {

   const userDocument = useSelector((state) => state.document.value);
   console.log(userDocument);

   const url = userDocument.iban

   const pdfSource = { uri: `${url}`, cache: true };
   
   return (
      <PDFcontent source={pdfSource} />
   );
}

