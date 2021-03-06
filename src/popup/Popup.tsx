import React, { CSSProperties } from "react";
import {
  Icon,
  Grid,
  Row,
  Button,
  ButtonGroup,
} from "react-lightning-design-system";
import { CopyButton, BtnGrpStyle } from "./copybtn";
import { Format } from "../constant";
import { OptionsType } from "../options/Options";
import { copyToClipboardAsHtml } from "../util";
import * as CSS from "csstype";
type Props = {
  title: string;
  url: string;
  opts: OptionsType;
};

// TODO Default Template Indicator
export const Popup: React.FC<Props> = ({ title, url, opts }) => {
  return (
    <Grid className="slds-gutters">
      <Row cols={1}>
        <div className="slds-text-heading_small">{title}</div>
      </Row>
      <Row cols={1}>
        <div
          className="slds-text-body_small"
          style={{ wordBreak: "break-all" }}
        >
          {`${opts.isDecoded ? decodeURI(url) : url}`}
        </div>
      </Row>
      <Row cols={1}>
        <div>
          {`has been copy as ${opts.selected_format.name} `} 
          <small>
            {`${opts.isSanitize ? "Sanitized" : " "}`}
          </small>
          <small>
            {`${opts.isDecoded ? "Decoded" : " "}`}
          </small>
        </div>
      </Row>
      <hr />
      <Row cols={1}>
        <div className="slds-text-heading_small">Copy as</div>
      </Row>
      <ButtonGroup style={BtnGrpStyle}>
        <Button
          type="brand"
          label="Rich Text"
          onClick={(e) => {
            copyToClipboardAsHtml(title, url);
            window.close();
          }}
        />
        <Button
          type="neutral"
          label="Sanitize"
          onClick={(e) => {
            copyToClipboardAsHtml(title, url, true);
            window.close();
          }}
        />
      </ButtonGroup>
      {opts.formats.map((format) => (
        <CopyButton key={format.name} title={title} url={url} format={format} />
      ))}
    </Grid>
  );
};
