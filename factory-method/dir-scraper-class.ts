import { readdirSync, readFileSync } from "fs"


abstract class DirScraper {
    constructor(public dirPath: string) { }
    scanFiles() {
        return readdirSync(this.dirPath).reduce<Record<string, unknown>>((acc, file) => {
            if (this.isJSONFile(file)) {
                acc[file] = this.readJSON(`${this.dirPath}/${file}`)
            } else {
                acc[file] = this.readText(`${this.dirPath}/${file}`)
            }
            return acc
        }, {})
    }

    abstract isJSONFile(file: string): boolean
    abstract readText(file: string): string
    abstract readJSON(file: string): unknown
}

class FileReader extends DirScraper {
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

const fl = new FileReader("./data")
console.log(fl.scanFiles())