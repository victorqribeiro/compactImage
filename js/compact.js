const fileName = 'test-8-colors.png'

let img = new Image()
img.src = fileName
img.onload = () => {

    const canvas = document.createElement('canvas')
    canvas.width = w = img.width
    canvas.height = h = img.height
    const c = canvas.getContext('2d')
    c.drawImage(img,0,0)
    
    const data = c.getImageData(0,0,w,h).data
    
    let finalData = `1.${w}.${h}.4.`
    
    let biggest, biggestTotal = 0
    
    const colors = {}
    for(let i = 0; i < data.length; i+=4){
        if( !data[i+3] )
            continue
        const r = data[i]
        const g = data[i+1]
        const b = data[i+2]
        const key = `${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`
        if( key in colors ){
            colors[key].data.push((i/4).toString(36))
            colors[key].total += 1
        }else{
            colors[key] = {
                total: 1,
                data: [(i/4).toString(36)]
            }
        }
        if( !biggest || colors[key].total > biggestTotal ){
            biggest = key
            biggestTotal = colors[key].total
        }
    }
    
    finalData += `${biggest}.`
    
    for(const key in colors){
        if( key == biggest )
            continue
        finalData += `${key}${colors[key].data.join(',')}.`
    }

	const URL = window.URL || window.webkitURL
	let blob = new Blob([finalData], {type: 'text/plain'})
	let link = document.createElement('a')
	link.href = URL.createObjectURL(blob)
	link.download = fileName.replace('.png','.dat')
	link.click()
}
