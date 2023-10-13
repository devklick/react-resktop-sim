import pako from "pako";
import base64js from "base64-js";

function useCompression() {
  function compress(data: string) {
    return base64js.fromByteArray(pako.deflate(data));
  }

  function decompress(data: string) {
    return pako.inflate(base64js.toByteArray(data), { to: "string" });
  }

  return { compress, decompress };
}

export default useCompression;
