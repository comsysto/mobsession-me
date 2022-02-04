import { FC } from "react";
import { Columns, Content, Icon, Level } from "react-bulma-components";

export const Footer: FC<{}> = () => {
  return (
    <Columns.Column data-testid="footer" size={6} offset={3}>
      <br />
      <Level renderAs="nav">
        <Level.Item renderAs="small" data-testid="with-love-item">
          Made with <Icon className="fas fa-heart"></Icon> in{" "}
          <Content renderAs="a" p={1} href="https://www.smartcloudincubator.de/" rel="noreferrer" target="_blank">
            Munich
          </Content>
        </Level.Item>
        <Level.Item renderAs="small">
          <Content
            p={1}
            renderAs="a"
            href="https://legal.comsysto.com/comsystoreply.de/en/impressum/"
            rel="noreferrer"
            target="_blank">
            Legal notice
          </Content>
        </Level.Item>
        <Level.Item renderAs="small">
          <Content
            p={1}
            renderAs="a"
            href="https://legal.comsysto.com/comsystoreply.de/en/datenschutz/"
            rel="noreferrer"
            target="_blank">
            Privacy notice
          </Content>
        </Level.Item>
      </Level>
    </Columns.Column>
  );
};
