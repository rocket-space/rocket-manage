/**
 *
 Created by zhangzhao on 2017/5/31.
 Email: zhangzhao@gomeplus.com
 */
import fetch from 'utils/fetch';
export async function getProjects(params = {}) {
    let res = await fetch.get(
        `/project/${params.id}`, {
            params,
            loading: {
                progress: true
            }
        });
    res = res.data;
    return res;
}

export async function releaseProject(params = {}) {
    let res = await fetch.get(
        `/project/release/${params.id}`, {
            params,
            loading: {
                progress: true
            }
        });
    res = res.data;
    return res;
}