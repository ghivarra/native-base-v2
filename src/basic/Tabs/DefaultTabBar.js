/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { connectStyle } from 'native-base-shoutem-theme';

import mapPropsToStyleNames from '../../utils/mapPropsToStyleNames';
import variable from './../../theme/variables/platform';
import { TabHeading } from '../TabHeading';
import { Text } from '../Text';
import { TabContainer } from '../TabContainer';

const ReactNative = require('react-native');
const { View, Animated } = ReactNative;
const Button = require('./Button');

const DefaultTabBar = createReactClass({
  propTypes: {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    disabledTextColor: PropTypes.string,
    tabStyle: PropTypes.array,
    activeTabStyle: PropTypes.array,
    textStyle: PropTypes.array,
    activeTextStyle: PropTypes.array,
    tabHeaderStyle: PropTypes.array,
    underlineStyle: PropTypes.any,
    tabContainerStyle: PropTypes.any,
    accessible: PropTypes.array,
    accessibilityLabel: PropTypes.array,
    disabled: PropTypes.array,
    containerWidth: PropTypes.number,
    scrollValue: PropTypes.object,
    renderTab: PropTypes.func
  },

  getDefaultProps() {
    return {
      activeTextColor: variable.topTabBarActiveTextColor,
      inactiveTextColor: variable.topTabBarTextColor,
      disabledTextColor: variable.tabBarDisabledTextColor,
      backgroundColor: 'transparent',
      tabFontSize: variable.tabFontSize,
      tabStyle: [],
      activeTabStyle: [],
      textStyle: [],
      activeTextStyle: [],
      tabHeaderStyle: [],
      disabled: [],
      accessible: [],
      accessibilityLabel: []
    };
  },

  getVariables(props) {
    const themeVars =
      props?.theme?.['@@shoutem.theme/themeStyle']?.variables;
    return themeVars || variable;
  },

  renderTab(
    name,
    page,
    isTabActive,
    onPressHandler,
    tabStyle,
    activeTabStyle,
    textStyle,
    activeTextStyle,
    tabHeaderStyle,
    tabFontSize,
    disabled,
    disabledTextColor,
    accessible,
    accessibilityLabel
  ) {
    const headerContent =
      typeof name !== 'string' ? name.props.children : undefined;
    const { activeTextColor, inactiveTextColor } = this.props;

    const isDisabled = !!disabled;
    let textColor;

    if (isDisabled) {
      textColor = disabledTextColor;
    } else if (isTabActive) {
      textColor = activeTextStyle?.color || activeTextColor;
    } else {
      textColor = textStyle?.color || inactiveTextColor;
    }

    const accessibilityState = {
      disabled: isDisabled,
      selected: isTabActive
    };

    if (typeof name === 'string') {
      return (
        <Button
          style={{ flex: 1 }}
          disabled={isDisabled}
          key={name}
          accessible={accessible}
          accessibilityRole="tab"
          accessibilityLabel={accessibilityLabel}
          accessibilityState={accessibilityState}
          onPress={() => onPressHandler(page)}
        >
          <TabHeading
            style={isTabActive ? activeTabStyle : tabStyle}
            active={isTabActive}
          >
            <Text
              style={[
                { fontSize: tabFontSize },
                isTabActive ? activeTextStyle : textStyle,
                { color: textColor }
              ]}
            >
              {name}
            </Text>
          </TabHeading>
        </Button>
      );
    }

    return (
      <Button
        style={{ flex: 1 }}
        disabled={isDisabled}
        key={_.uniqueId('tab_')}
        accessible={accessible}
        accessibilityRole="tab"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={accessibilityState}
        onPress={() => onPressHandler(page)}
      >
        <TabHeading style={tabHeaderStyle} active={isTabActive}>
          {headerContent}
        </TabHeading>
      </Button>
    );
  },

  render() {
    const variables = this.getVariables(this.props);
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;

    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: variables.topTabBarActiveBorderColor,
      bottom: 0
    };

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, containerWidth / numberOfTabs]
    });

    return (
      <TabContainer
        style={[
          { backgroundColor: variables.tabDefaultBg },
          this.props.tabContainerStyle || {}
        ]}
      >
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(
            name,
            page,
            isTabActive,
            this.props.goToPage,
            this.props.tabStyle[page],
            this.props.activeTabStyle[page],
            this.props.textStyle[page],
            this.props.activeTextStyle[page],
            this.props.tabHeaderStyle[page],
            variables.tabFontSize,
            this.props.disabled[page],
            this.props.disabledTextColor,
            this.props.accessible[page],
            this.props.accessibilityLabel[page]
          );
        })}
        <Animated.View
          style={[tabUnderlineStyle, { left }, this.props.underlineStyle]}
        />
      </TabContainer>
    );
  }
});

const StyledTab = connectStyle(
  'NativeBase.DefaultTabBar',
  {},
  mapPropsToStyleNames
)(DefaultTabBar);

export { StyledTab as DefaultTabBar };
