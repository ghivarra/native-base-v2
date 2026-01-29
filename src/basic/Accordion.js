/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  View
} from 'react-native';
import { Text } from './Text';
import { Icon } from './Icon';
import variable from '../theme/variables/platform';

const styles = StyleSheet.create({
  defaultHeader: {
    flexDirection: 'row',
    padding: variable.accordionContentPadding,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

class DefaultHeader extends React.PureComponent {
  render() {
    const {
      disable,
      expanded,
      expandedIcon,
      expandedIconStyle,
      headerStyle,
      icon,
      iconStyle,
      title,
      theme
    } = this.props;
    
    const variables = (theme && theme['@@shoutem.theme/themeStyle'] && theme['@@shoutem.theme/themeStyle'].variables) ? theme['@@shoutem.theme/themeStyle'].variables.variables : variable;

    return (
      <View
        style={[
          styles.defaultHeader,
          headerStyle || { backgroundColor: variables.headerStyle }
        ]}
      >
        <Text style={{ color: disable ? variable.disableRow : null }}>
          {title}
        </Text>
        <Icon
          style={[
            { fontSize: variables.accordionIconFontSize },
            expanded
              ? expandedIcon && expandedIconStyle
                ? expandedIconStyle
                : { color: variables.expandedIconStyle }
              : icon && iconStyle
              ? iconStyle
              : { color: disable ? variable.disableRow : variables.iconStyle }
          ]}
          name={
            expanded ? expandedIcon || 'ios-arrow-up' : icon || 'ios-arrow-down'
          }
        />
      </View>
    );
  }
}

class DefaultContent extends React.PureComponent {
  render() {
    const { content, contentStyle, theme } = this.props;
    const variables = (theme && theme['@@shoutem.theme/themeStyle'] && theme['@@shoutem.theme/themeStyle'].variables) ? theme['@@shoutem.theme/themeStyle'].variables.variables : variable;

    return (
      <Text
        style={[
          { padding: variable.accordionContentPadding },
          contentStyle || { backgroundColor: variables.contentStyle }
        ]}
      >
        {content}
      </Text>
    );
  }
}

class AccordionSubItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0.3)
    };
  }

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }

  render() {
    const { children, style } = this.props;
    const { fadeAnim } = this.state;

    return (
      <Animated.View style={[style, { opacity: fadeAnim }]}>
        {children}
      </Animated.View>
    );
  }
}

class AccordionItem extends React.PureComponent {
  render() {
    const {
      contentStyle,
      disable,
      expanded,
      expandedIcon,
      expandedIconStyle,
      headerStyle,
      icon,
      iconStyle,
      index,
      item,
      onAccordionClose,
      onAccordionOpen,
      renderContent,
      renderHeader,
      setSelected,
      theme
    } = this.props;

    return (
      <View>
        <TouchableWithoutFeedback
          disabled={disable}
          onPress={() => {
            onAccordionOpen && !expanded && onAccordionOpen(item, index);
            onAccordionClose && expanded && onAccordionClose(item, index);
            setSelected(index);
          }}
        >
          <View>
            {renderHeader ? (
              renderHeader(item, expanded, index)
            ) : (
              <DefaultHeader
                disable={disable}
                expanded={expanded}
                headerStyle={headerStyle}
                icon={icon}
                iconStyle={iconStyle}
                expandedIcon={expandedIcon}
                expandedIconStyle={expandedIconStyle}
                title={item.title}
                theme={theme}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
        {expanded ? (
          <AccordionSubItem>
            {renderContent ? (
              renderContent(item, index)
            ) : (
              <DefaultContent
                content={item.content}
                contentStyle={contentStyle}
                theme={theme}
              />
            )}
          </AccordionSubItem>
        ) : null}
      </View>
    );
  }
}

export class Accordion extends React.PureComponent {
  constructor(props) {
    super(props);
    const { expanded, expandMultiple } = props;
    let selected = [];

    if (expanded !== undefined && expanded !== null) {
      selected = Array.isArray(expanded) ? expanded : [expanded];
      selected = expandMultiple ? selected : selected.slice(0, 1);
    }

    this.state = {
      selected
    };
  }

  setSelected = index => {
    const { expandMultiple } = this.props;
    const selected = [...this.state.selected];

    const i = selected.indexOf(index);
    if (i !== -1) {
      selected.splice(i, 1);
      this.setState({ selected });
    } else {
      this.setState({ selected: expandMultiple ? [...selected, index] : [index] });
    }
  };

  render() {
    const {
      contentStyle,
      dataArray,
      disable,
      expandedIcon,
      expandedIconStyle,
      headerStyle,
      icon,
      iconStyle,
      onAccordionClose,
      onAccordionOpen,
      renderContent,
      renderHeader,
      style,
      theme
    } = this.props;

    const variables = (theme && theme['@@shoutem.theme/themeStyle'] && theme['@@shoutem.theme/themeStyle'].variables) ? theme['@@shoutem.theme/themeStyle'].variables.variables : variable;

    return (
      <FlatList
        data={dataArray}
        extraData={this.state}
        style={[
          {
            borderColor: variables.accordionBorderColor,
            borderWidth: variables.borderWidth
          },
          style
        ]}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item, index }) => (
          <AccordionItem
            disable={disable === index}
            item={item}
            expanded={this.state.selected.includes(index)}
            index={index}
            setSelected={this.setSelected}
            headerStyle={headerStyle}
            contentStyle={contentStyle}
            renderHeader={renderHeader}
            renderContent={renderContent}
            icon={icon}
            iconStyle={iconStyle}
            expandedIcon={expandedIcon}
            expandedIconStyle={expandedIconStyle}
            onAccordionOpen={onAccordionOpen}
            onAccordionClose={onAccordionClose}
            theme={theme}
          />
        )}
      />
    );
  }
}
