import { isBoolean, isNumber, isObject, isString } from "@ripple/ui-helpers"

/**
 * Set an item (key/value) in local storage.
 *
 * @param {string} key The key
 * @param {unknown} value The value
 */
export const setLocalStorageItem = (
  key: string,
  value: Record<string, any> | string | number | boolean,
) => {
  try {
    if (isString(value)) {
      localStorage.setItem(key, value)
    } else if (isNumber(value) || isBoolean(value)) {
      localStorage.setItem(key, value.toString())
    } else if (isObject(value)) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      console.error(`Unrecognized local storage value ${value} for key: ${key}`)
    }
  } catch (err) {
    console.error(err)
  }
}

/**
 * Retrieve an item from the local storage.
 *
 * @param {string} key
 * @returns Any value.
 */
export const getLocalStorageItem = <T = unknown>(key: string): T | undefined => {
  const value = localStorage.getItem(key)

  if (value === null || value === "undefined") {
    return undefined
  }

  try {
    return JSON.parse(value) as T
  } catch (_err) {
    return value as unknown as T
  }
}

/**
 * Remove an item from the local storage.
 *
 * @param {string} key
 */
export const removeLocalStorageItem = (key: string) => {
  try {
    localStorage.removeItem(key)
  } catch {
    console.error(`Couldn't remove the local storage item ${key}`)
  }
}
