import { readdirSync, readFileSync } from "fs"

interface FileReaderInterface {
    isJSONFile(file: string): boolean
    readText(file: string): string
    readJSON(file: string): unknown
}

class DirScraper {
    constructor(public dirPath: string, public fileReader: FileReader) { }
    scanFiles() {
        return readdirSync(this.dirPath).reduce<Record<string, unknown>>((acc, file) => {
            if (this.fileReader.isJSONFile(file)) {
                acc[file] = this.fileReader.readJSON(`${this.dirPath}/${file}`)
            } else {
                acc[file] = this.fileReader.readText(`${this.dirPath}/${file}`)
            }
            return acc
        }, {})
    }
}

class FileReader implements FileReaderInterface {
    isJSONFile(file: string): boolean {
        return file.endsWith('.json')
    }
    readText(file: string): string {
        return readFileSync(file, "utf-8").toString()
    }

    readJSON(file: string): unknown {
        return JSON.parse(readFileSync(file, "utf-8").toString())
    }
}

const fileR = new FileReader()
const dirScrapper = new DirScraper('./data', fileR)
console.log(dirScrapper.scanFiles())