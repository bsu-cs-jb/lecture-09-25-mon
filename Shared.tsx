import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  PressableProps,
  Text,
  TextProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import styles from "./styles";

export function LabelText(props: TextProps) {
  return (
    <RenderHighlightText style={styles.labelText}>
      {props.children}
    </RenderHighlightText>
  );
}

export function TitleText(props: TextProps) {
  return (
    <RenderHighlightText style={styles.titleText}>
      {props.children}
    </RenderHighlightText>
  );
}
export function SubtitleText(props: TextProps) {
  return (
    <RenderHighlightText style={styles.subTitleText}>
      {props.children}
    </RenderHighlightText>
  );
}

export function FlexFill() {
  return <View style={styles.flexFill} />;
}

export function LctHorzContainer({
  children,
  style,
  ...props
}: ViewProps) {
  return (
    <RenderHighlightView
      style={[style, styles.horzContainer]}
      {...props}
    >
      {children}
    </RenderHighlightView>
  );
}

export function LctAvoidingView({ children, ...props }: ViewProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.avoidingView}
    >
      <LctView {...props}>{children}</LctView>
    </KeyboardAvoidingView>
  );
}
export function LctView({ children, ...props }: ViewProps) {
  return (
    <RenderHighlightView {...props}>{children}</RenderHighlightView>
  );
}

function useRenderHighlight(delay: number = 750) {
  const [showHighlight, setShowHighlight] = useState(true);
  const fromInterval = useRef(false);
  if (!fromInterval.current && !showHighlight) {
    setShowHighlight(true);
  }
  fromInterval.current = false;
  const highlight = showHighlight
    ? {
        borderColor: "#f00f",
        backgroundColor: "#f001",
        borderWidth: 2,
      }
    : {
        borderColor: "#0000",
        backgroundColor: "#0000",
        borderWidth: 2,
      };
  useEffect(() => {
    if (showHighlight) {
      const id = setInterval(() => {
        fromInterval.current = true;
        setShowHighlight(false);
      }, delay);
      return () => {
        clearInterval(id);
      };
    }
  });
  return highlight;
}

export function RenderHighlightView({
  children,
  style,
  ...props
}: ViewProps) {
  const highlight = useRenderHighlight();
  return (
    <View style={[style, highlight]} {...props}>
      {children}
    </View>
  );
}

export function RenderHighlightText({
  children,
  style,
  ...props
}: TextProps) {
  const highlight = useRenderHighlight();
  return (
    <Text style={[style, highlight]} {...props}>
      {children}
    </Text>
  );
}

interface BigButtonProps extends PressableProps {
  title: string;
  style?: ViewStyle;
}

export function BigButton({
  title,
  onPress,
  style,
  ...props
}: BigButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        style,
        pressed ? styles.bigButtonPressed : styles.bigButtonUnpressed,
      ]}
      onPress={onPress}
    >
      <LabelText>{title}</LabelText>
    </Pressable>
  );
}
