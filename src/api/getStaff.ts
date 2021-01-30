import { gql } from "@apollo/client";
import api from "./client";
import { Staff } from "./types";

interface StaffData {
  Staff: Staff;
}

interface StaffVars {
  id: number;
}

const GET_STAFF_LIST = gql`
  query($id: Int) {
    Staff(id: $id) {
      name {
        full
      }
    }
  }
`;

const getStaff = async ({ id }: StaffVars): Promise<Staff> => {
  const result = await api.query<StaffData, StaffVars>({
    query: GET_STAFF_LIST,
    variables: { id },
  });

  return result.data.Staff;
};

export default getStaff;
