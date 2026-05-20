// components/common/Breadcrumb/Breadcrumb.tsx

import { Link } from "react-router-dom";
import "./breadcrumb.css";
import Container from "../Container";

type BreadcrumbItem = {
  label: string;
  path?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <Container>
      <div className="breadcrumb">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={index} className="breadcrumb-item">
              {isLast ? (
                <span className="active">{item.label}</span>
              ) : (
                <Link to={item.path || "/"}>{item.label}</Link>
              )}

              {!isLast && <span className="separator">/</span>}
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default Breadcrumb;
