import { createAlova, Method } from "alova";
import adapterFetch from "alova/fetch";
import vueHook from "alova/vue";
import { ElMessage } from "element-plus";
import { createAlovaMockAdapter } from "@alova/mock";
import basic from "./mock/basic";
import type { ApiResult } from "@/types/api";
import router from "@/router";

const getUserToken = () => localStorage.getItem('token') || ''



const testMockAdapter = createAlovaMockAdapter([basic], {
    enable: true,
    httpAdapter: adapterFetch(),
    delay: 1000,
    mockRequestLogger: true,
    onMockResponse: ({ body, responseHeaders, status = 200, statusText = 'ok' }) => {
      return {
        response: new Response(
          /^\[object (Blob|FormData|ReadableStream|URLSearchParams)\]$/i.test(Object.prototype.toString.call(body))
            ? body
            : JSON.stringify(body),
          {
            status,
            statusText
          }
        ),
        headers: new Headers(responseHeaders)
      };
    }
})

export const mockAlovaInstance = createAlova({
    baseURL: import.meta.env.BASE_URL,
    statesHook: vueHook,
    requestAdapter: testMockAdapter,
    beforeRequest: (method : Method) => {
        method.config.headers.Authorization = `Bearer ${getUserToken()}`
        method.config.headers['Content-Type'] = 'application/json; charset=utf-8'
    },
    responded: {
        onSuccess: async(resp) => {
            
            if(resp.status !== 200) {
                ElMessage({ message: 'Request Error', type: 'error' })
                return
            }
            const apiResult : ApiResult<any> = await resp.json()

            if(apiResult.code === 400) {
                ElMessage({ message: apiResult.message, type: 'error' })
                return null
            }
            if(apiResult.code === 401) {
                ElMessage({ message: '请先登录', type: 'warning' })
                return null
            }

            if(apiResult.code === 403) {
                router.replace({ name: 'forbidden' })
                return null
            }
            if(apiResult.code === 404) {
                router.replace({ name: '404' })
                return null
            }
            if(apiResult.code === 200 && (apiResult.data === null || apiResult.data === undefined)) {
                return true
            }
            if(apiResult.code !== 200 && apiResult.message) {
                ElMessage({ message: apiResult.message, type: 'error' })
            }
            return apiResult.data
        },
        onError: err => {
            console.error(err);
            ElMessage({ message: 'Requset Error', type: 'error' })
            return err
        },
    },
})


export const alovaInstance = createAlova({
    baseURL: import.meta.env.BASE_URL,
    statesHook: vueHook,
    requestAdapter: adapterFetch(),
    beforeRequest: (method : Method) => {
        method.config.headers.Authorization = `Bearer ${getUserToken()}`
        method.config.headers['Content-Type'] = 'application/json; charset=utf-8'
    },
    responded: {
        onSuccess: async(resp) => {
            if(resp.status !== 200) {
                ElMessage({ message: 'Requset Error', type: 'error' })
                return
            }
            const apiResult : ApiResult<any> = await resp.json()
            if(apiResult.success) {
                throw(new Error(apiResult.message || 'Request faild.'))
            }
            if(apiResult.success && (apiResult.data === null || apiResult.data === undefined)) {
                return true
            }
            if(!apiResult.success && apiResult.message) {
                ElMessage({ message: apiResult.message, type: 'error' })
            }
            return apiResult.data
        },
        onError: err => {
            console.error(err);
            ElMessage({ message: 'Requset Error', type: 'error' })
            return err
        },
    },
})