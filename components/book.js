import * as React from 'react';
import {View} from 'react-native'
import PDFReader from 'rn-pdf-reader-js'

export default function book (){

return(
  <PDFReader
        source={{
          uri: 'jdjj',
        }}
      />
)
}