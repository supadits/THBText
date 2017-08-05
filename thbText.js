const numText = ['', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า']
const unitText = ['', '', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน']
const buildText = (digit, pos) => {
  if(digit===2 && pos===2) return 'ยี่สิบ'
  else if(digit===1 && pos===1) return 'เอ็ด'
  else if(digit===0) return ''
  else return numText[digit]+unitText[pos]
}


export default function THBValueToText(value) {
  let baht = Math.floor(value)
  let satang = Math.round(value*100)%100

  let bahtText = (''+baht)
    .replace(/\B(?=(\d{6})+(?!\d))/g, ',')
    .split(',')
    .map(milSegment => {
      return Array
        .from(milSegment)
        .map(Number)
        .map((digit, idx) => buildText(digit,milSegment.length-idx))
        .join('')
    })
    .join('ล้าน')+'บาท'


  let satangText = (satang>0)? Array.from(''+satang)
    .map(Number)
    .map((digit, idx) => buildText(digit, 2-idx))
    .join('')+'สตางค์':'ถ้วน'

  return bahtText+satangText
}