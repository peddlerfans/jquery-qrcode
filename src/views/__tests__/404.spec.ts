import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import C404 from '../404.vue'

describe('404', () => {
  it('renders properly', async() => {
    const wrapper = mount(C404 )
    // expect(wrapper.text()).toContain('4 x 2 = 8')
    expect(wrapper.html()).toMatchSnapshot()
  
    // it('renders properly', () => {
    //     const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    //     expect(wrapper.text()).toContain('Hello Vitest')
    //   })
    
  
    expect(wrapper.text()).toContain('抱歉，您访问的页面不存在')
    await wrapper.get('button').trigger('click')
    // await wrapper.get('button').trigger('click')
  
    // expect(wrapper.text()).toContain('4 x 4 = 16')
  })
})