"use client";

import { Select } from "@radix-ui/themes";

const CategorySelect = () => {
  return (
    <>
      <Select.Root>
        <Select.Trigger placeholder="Select Category" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Category Options</Select.Label>
            <Select.Item value="1">Uncategorized</Select.Item>
            <Select.Item value="7">Packaged Food</Select.Item>
            {/* {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))} */}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default CategorySelect;
