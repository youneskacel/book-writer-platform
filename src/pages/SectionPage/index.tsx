import React from "react";
import { useSearchParams } from "react-router-dom";
import { sectionsApi } from "../../store/query/sections";
import { useAuth } from "../../context/auth/AuthContext";

const SectionPage = () => {
  const [searchParams] = useSearchParams();

  const { user } = useAuth();

  const { data: sections = [] } = sectionsApi.useGetSectionsQuery(
    {},
    {
      skip: !user,
    }
  );

  const path = React.useMemo(() => {
    const pathIds = searchParams.get("item")?.split(",");
    const elements = pathIds?.map((id) =>
      sections.find((section: any) => section.id === id)
    );
    return elements;
  }, [searchParams, sections]);

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <div className="flex items-center gap-1 w-full">
        {path?.map((section, index) => (
          <>
            <p className={`${index < path.length - 1 ? "text-gray-600 font-medium" : " font-bold text-lg"}`}>
              {" "}
              {index > 0 ? "/" : ""} {section?.title}{" "}
            </p>
          </>
        ))}
      </div>
    </div>
  );
};

export default SectionPage;
