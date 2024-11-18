import { LoggerFactory } from "./factory-class"

const logger= LoggerFactory.createLogger()

logger.debug("Hello Debugger")
logger.info('Hello info')
logger.error("Hello Error")
logger.warn("Hello warning")