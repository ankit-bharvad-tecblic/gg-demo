import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "components/Tables/FunctionalTable";
import React, { useEffect, useState } from "react";

const StateMaster = () => {
  const columnHelper = createColumnHelper();
  const [filter, setFilter] = useState({
    filter: [],
    search: "",
  });

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "STATE ID",
    }),
    columnHelper.accessor("zone.zone_type", {
      cell: (info) => info.getValue(),
      header: "ZONE TYPE",
    }),
    columnHelper.accessor("state_name", {
      cell: (info) => info.getValue(),
      header: "STATE NAME",
    }),
    columnHelper.accessor("active", {
      header: "ACTIVE/DEACTIVE",
    }),
    columnHelper.accessor("", {
      header: "UPDATE",
    }),
  ];

  const filterFields = [
    {
      "ZONE TYPE": "zone__zone_type",
      isActiveFilter: false,
    },
  ];

  //   const getData = () => {
  //     fetch("http://127.0.0.1:8000/warehouse/zone/", {
  //       method: "get",
  //       headers: new Headers({
  //         Authorization: "Basic " + btoa("username:password"),
  //       }),
  //     });
  //   };

  const [data, setData] = useState([]);

  let paramString = "";

  const getData = async () => {
    //params filter
    if (filter.filter.length || filter.search) {
      paramString = Object.entries(filter)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return value
              .map((item) => `${key}=${encodeURIComponent(item)}`)
              .join("&");
          }
          return `${key}=${encodeURIComponent(value)}`;
        })
        .join("&");
    }

    try {
      const response = await fetch(
        `http://192.168.0.124:8000/warehouse/state?${paramString}`,
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2ODY5OTQ5NzEsImlhdCI6MTY4NjEzMDk3MX0.0mxvqjEEnPiopC_8c8PxLlAoiXMAt5__-OW55wHtaBM",
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      console.log("Success:", result);
      setData(result?.results || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log("filter =-==> ", filter);
    handleSearch();
  }, [filter.search]);

  let timeoutId;

  const handleSearch = () => {
    clearTimeout(timeoutId);
    // Set a new timeout to call the API after 0.5 seconds
    timeoutId = setTimeout(() => {
      getData();
    }, 800);
  };

  return (
    <div>
      <FunctionalTable
        filterFields={filterFields}
        setFilter={setFilter}
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default StateMaster;

// District Master: http://127.0.0.1:8000/warehouse/district?filter=district_name&filter=state__zone__zone_type&search=sou
// State Master:http://127.0.0.1:8000/warehouse/state?filter=state_name&filter=zone__zone_type
// Area Master: http://127.0.0.1:8000/warehouse/area?search=nav&filter=cluster_name&filter=district__district_name&filter=district__state__state_name&filter=district__state__zone__zone_type
