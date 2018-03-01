import React from 'react'
import Styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'
import Header from '../../components/Layout/Header'
import Sider from '../../components/Layout/Sider'
import TagContentContainer from '../../components/TagContent'
import { LoadingContent } from '../../components/Content'
import CategoryContentContainer from '../../components/CategoryContent'
import WriteBlogContentContainer from '../../components/WriteBlogContent'

import BlogListContent from '../../components/BlogListContent'

import { menus } from '../../constants'
import { Layout } from 'antd'

const StyledRightLayout = Styled(Layout)`
  &&& {
    height: 100vh;
    overflow: scroll;
    position: relative;
  }
`

class MainPage extends React.Component {
  state = {
    collapsed: false
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          menus={menus}
        />
        <StyledRightLayout id="my-scroll-layout">
          <Header collapsed={this.state.collapsed} toggle={this.toggle} />
          <Switch>
            <Route path="/home" component={BlogListContent} />
            <Route path="/writeblog" component={WriteBlogContentContainer} />
            <Route path="/categories" component={CategoryContentContainer} />
            <Route path="/tags" component={TagContentContainer} />
            <Route component={LoadingContent} />
          </Switch>
        </StyledRightLayout>
      </Layout>
    )
  }
}

export default MainPage
