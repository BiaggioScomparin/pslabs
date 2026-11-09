const zlib = require('zlib');

function unfilterPNG(buf) {
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  
  let p = 8;
  const idats = [];
  while (p < buf.length) {
    const len = buf.readUInt32BE(p);
    const type = buf.toString('ascii', p + 4, p + 8);
    if (type === 'IDAT') idats.push(buf.slice(p + 8, p + 8 + len));
    p += 12 + len;
  }
  
  const raw = zlib.inflateSync(Buffer.concat(idats));
  const bpp = 4; // RGBA
  const stride = width * bpp;
  const uncompressed = Buffer.alloc(height * stride);
  
  let prevRow = Buffer.alloc(stride);
  let srcOffset = 0;
  
  function paeth(a, b, c) {
    const p = a + b - c;
    const pa = Math.abs(p - a);
    const pb = Math.abs(p - b);
    const pc = Math.abs(p - c);
    if (pa <= pb && pa <= pc) return a;
    if (pb <= pc) return b;
    return c;
  }

  for (let y = 0; y < height; y++) {
    const filter = raw[srcOffset++];
    const row = Buffer.alloc(stride);
    
    for (let x = 0; x < stride; x++) {
      const rawVal = raw[srcOffset++];
      const left = x >= bpp ? row[x - bpp] : 0;
      const up = prevRow[x];
      const upLeft = x >= bpp ? prevRow[x - bpp] : 0;
      
      let val = 0;
      if (filter === 0) val = rawVal;
      else if (filter === 1) val = (rawVal + left) & 0xff;
      else if (filter === 2) val = (rawVal + up) & 0xff;
      else if (filter === 3) val = (rawVal + Math.floor((left + up) / 2)) & 0xff;
      else if (filter === 4) val = (rawVal + paeth(left, up, upLeft)) & 0xff;
      
      row[x] = val;
    }
    
    row.copy(uncompressed, y * stride);
    prevRow = row;
  }
  
  return { width, height, data: uncompressed };
}

module.exports = { unfilterPNG };
