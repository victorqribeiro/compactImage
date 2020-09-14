let dataImg

const load = async (fileSrc) => {
    const request = await fetch(fileSrc)
    const response = await request.text()
    dataImg = response.replace(/\n/,'')
    init()
}

const parseUntil = (char) => {

    let c
    let i = 0
    let finalString = ''
    
    while(true){
    
        c = dataImg.substring(0,1)
        dataImg = dataImg.substring(1)
        if( c == char )
            break
        finalString += c
    
    }

    return finalString

}

const parseImage = () => {

    const v = parseUntil('.')

    const w = parseInt(parseUntil('.'))

    const h = parseInt(parseUntil('.'))

    const c = parseUntil('.')
    
    const bg = parseUntil('.')
    
    const newImage = new ImageData(w,h)
    
    for(let i = 0; i < newImage.data.length; i+=4){
        newImage.data[i] = parseInt(bg.substring(0,2),16)
        newImage.data[i+1] = parseInt(bg.substring(2,4),16)
        newImage.data[i+2] = parseInt(bg.substring(4,6),16)
    }

    while(dataImg){

        const color = dataImg.substring(0,6)
        
        dataImg = dataImg.substring(6)
        
        const pixels = parseUntil('.').split(',')
        
        for(let i = 0; i < pixels.length; i++){
            const index = parseInt(pixels[i],36) * 4
            newImage.data[index] = parseInt(color.substring(0,2),16)
            newImage.data[index+1] = parseInt(color.substring(2,4),16)
            newImage.data[index+2] = parseInt(color.substring(4,6),16)
            newImage.data[index+3] = 255
        }
        
    }
    
    return newImage
}

const init = () => {

    const image = parseImage()

    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d')
    ctx.putImageData(image,0,0)

}

load('test-8-colors.dat')
