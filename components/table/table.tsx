"use client";
import React, { useMemo, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { Trash2, Edit2Icon, Filter, X, RotateCcw } from "lucide-react";
import { Button } from "../ui/button";
import { data } from "@/data/data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

export type User = {
  image: string;
  name: string;
  status: "Active" | "Inactive";
  role: string;
  email: string;
  team: string[];
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
  contactNumber?: string;
  workEmail?: string;
  researchPublication?: string;
};

const columnHelper = createColumnHelper<User>();

const Table: React.FC = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredData = useMemo(
    () =>
      data.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.role.toLowerCase().includes(search.toLowerCase()) ||
          user.status.toLowerCase().includes(search.toLowerCase()) ||
          user.team.some((team) =>
            team.toLowerCase().includes(search.toLowerCase())
          )
      ),
    [search]
  );

  const SidePane: React.FC<{ user: User; onClose: () => void }> = ({
    user,
    onClose,
  }) => {
    return (
      <div className="fixed inset-y-0 right-0 bg-white shadow-lg p-6 overflow-y-auto mt-24 w-[692px] h-[895px]">
        <button
          onClick={onClose}
          className="absolute top-[20px] right-4 text-[#FFFCFC] hover:text-gray-200"
        >
          <X />
        </button>
        <div className="flex items-center mb-6 w-[681px] h-[141px] rounded-lg bg-[#2A5B7E]">
          <Image
            src={user.image}
            alt={user.name}
            width={64}
            height={64}
            className="rounded-full mr-4"
          />
          <div className="w-[188px] h-[77px] gap-3 ">
            <h2 className="text-[20px] leading-[24.2px] text-[#FFFCFC] text-nowrap  font-bold">
              {user.name}
            </h2>
            <div className="w-[188px] h-[41px] gap-24 flex">
              <div className="w-[49px] h-[42px] space-y-2">
                <p className="text-[#FFFCFC] font-normal text-[14px] leading-[17.5px]">
                  @{user.name.toLowerCase().replace(" ", "")}
                </p>
                <p className="text-[#FFFCFC] text-[14px] font-medium leading-[16.94px] text-nowrap">
                  User ID
                </p>
              </div>
              <div className="w-[49px] h-[42px] space-y-2">
                <p className="leading-[17.5px] font-normal text-[14px] text-nowrap text-[#FFFCFC]">
                  {user.role}
                </p>
                <p className="text-[14px] font-medium leading-[16.94px] text-[#FFFCFC]">
                  Role
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-[#EFF5FA] rounded-md p-[10px] w-[656px] h-[42px]">
            <h3 className="font-semibold text-gray-700 ">
              Personal Information
            </h3>
          </div>
          <div className="w-[656px] h-[264px] rounded-[8px]">
            <div className="w-full h-[44px] p-[12px]">
              <p className="text-[#64748B] font-normal text-[16px] leading-[20px]">
                <span className="font-medium w-[155px] h-[20px] text-[14px] leading-[20px] text-[#101828]">
                  Date of Birth
                </span>{" "}
                {user.dateOfBirth}
              </p>
            </div>
            <div className="w-full h-0 border"></div>
            <div className="w-full h-[44px] p-[12px]">
              <p className="text-[#64748B] font-normal text-[16px] leading-[20px]">
                <span className="font-medium w-[155px] h-[20px] text-[14px] leading-[20px] text-[#101828]">
                  Gender
                </span>{" "}
                {user.gender}
              </p>
            </div>
            <div className="w-full h-0 border"></div>
            <div className="w-full h-[44px] p-[12px]">
              <p className="text-[#64748B] font-normal text-[16px] leading-[20px] ">
                <span className="font-medium w-[155px] h-[20px] text-[14px] leading-[20px] text-[#101828]">
                  Nationality
                </span>{" "}
                {user.nationality}
              </p>
            </div>
            <div className="w-full h-0 border"></div>
            <div className="w-full h-[44px] p-[12px]">
              <p className="text-[#64748B] font-normal text-[16px] leading-[20px]">
                <span className="font-medium w-[155px] h-[20px] text-[14px] leading-[20px] text-[#101828]">
                  Contact no.
                </span>{" "}
                {user.contactNumber}
              </p>
            </div>
            <div className="w-full h-0 border"></div>
            <div className="w-full h-[44px] p-[12px]">
              <p className="text-[#64748B] font-normal text-[16px] leading-[20px]">
                <span className="font-medium w-[155px] h-[20px] text-[14px] leading-[20px] text-[#101828]">
                  E-mail Address
                </span>{" "}
                {user.email}
              </p>
            </div>
            <div className="w-full h-0 border"></div>
            <div className="w-full h-[44px] p-[12px]">
              <p className="text-[#64748B] font-normal text-[16px] leading-[20px]">
                <span className="font-medium w-[155px] h-[20px] text-[14px] leading-[20px] text-[#101828]">
                  Work email Address
                </span>{" "}
                {user.workEmail}
              </p>
            </div>
            <div className="w-full h-0 border"></div>
          </div>
          <div className="w-[656px] h-[207px]">
            <div className="w-[656px] h-[42px] rounded-md p-[10px] bg-[#EFF5FA]">
              <h3 className="font-semibold text-gray-700">
                Research & Publication
              </h3>
            </div>
            <div className="w-[304px] h-[20px] mt-2">
              <p className="font-medium text-[14px] leading-[20px] text-nowrap">
                {user.researchPublication}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleClosePane = () => {
    setSelectedUser(null);
  };

  const handleDelete = (id: string) => {
    console.log("Delete user with ID:", id);
  };

  const handleEdit = (id: string) => {
    console.log("Edit user with ID:", id);
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: ({ row }) => (
          <div className="flex items-center">
            <Image
              src={row.original.image}
              alt={row.original.name}
              width={40}
              height={40}
              className="rounded-full mr-3"
            />
            <div>
              <div className="text-sm font-medium">{row.original.name}</div>
              <div className="text-xs text-gray-500">
                @{row.original.name.toLowerCase().replace(" ", "")}
              </div>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: ({ getValue }) => (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              getValue() === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            ● {getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("role", {
        header: "Role",
        cell: ({ getValue }) => (
          <span className="text-sm font-medium">{getValue()}</span>
        ),
      }),
      columnHelper.accessor("email", {
        header: "Email address",
        cell: ({ getValue }) => (
          <span className="text-sm font-medium">{getValue()}</span>
        ),
      }),
      columnHelper.accessor("team", {
        header: "Teams",
        cell: ({ getValue }) => (
          <div className="flex space-x-1">
            {getValue().map((team, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800"
              >
                {team}
              </span>
            ))}
            <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
              +{getValue().length + 1}
            </span>
          </div>
        ),
      }),
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Trash2 />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-full bg-white w-[600px] h-[186px] p-3 gap-1 rounded-md">
                <DialogHeader>
                  <DialogTitle className="w-[552px] h-4 font-bold text-[18px] leading-[21.6px] text-[#242424]">
                    Delete Member Details
                  </DialogTitle>
                  <DialogDescription className="w-[552px] h-[48px] p-3  text-[#334155] text-wrap">
                    Are you sure you want to delete this Member details? This
                    action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="w-[552px] h-[42px] flex justify-end">
                  <Button
                    className=" text-white bg-[#6941C6] hover:bg-[#7247d6] font-bold text-[16px] rounded-md leading-[19.2px]"
                    onClick={() => handleDelete(row.original.name)}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Edit2Icon />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-full bg-white w-[704px] h-[648px] p-3 gap-1 rounded-md">
                <DialogHeader>
                  <DialogTitle className="w-[704px] h-[32px] p-3 font-bold text-[24px] leading-[29.05px] text-[#0F172A]">
                    Edit Profile
                  </DialogTitle>
                  <div className="flex flex-col items-center justify-center gap-16 p-4">
                    <div className="flex flex-col items-center justify-center gap-2 ">
                      <div className="">
                        <Image
                          src={row.original.image}
                          alt={row.original.name}
                          width={100}
                          height={100}
                          className="rounded-full mr-3"
                        />
                      </div>
                      <div className="flex items-center justify-center w-[345px] h-[36px] gap-3">
                        <Button className="flex items-center justify-center w-[171px] h-[36px] rounded-md p-1 gap-1 border-[1px] border-[#CBD5E1] bg-[#F8FAFC]">
                          <RotateCcw />
                          <h1 className="font-bold text-[14px] leading-[16.8px] text-[#06103C]">
                            CHANGE PHOTO
                          </h1>
                        </Button>
                        <Button className="flex items-center justify-center w-[171px] h-[36px] rounded-md p-1 gap-1 border-[1px] border-[#CBD5E1] bg-[#F8FAFC]">
                          <Trash2 />
                          <h1 className="font-bold text-[14px] leading-[16.8px] text-[#06103C]">
                            REMOVE PHOTO
                          </h1>
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-10">
                      <div className="w-[656px] h-[72px] gap-3 flex items-center justify-center">
                        <div className="w-[312px] h-[74px] gap-1">
                          <div className="w-[312px] h-[19px]">
                            <h1 className="font-semibold text-[16px] leading-[19.2px] text-[#0F172A]">
                              Name
                            </h1>
                          </div>
                          <div className="w-[312px] h-[48px]">
                            <input
                              type="text"
                              className="w-[312px] h-[48px] p-4 border-2 shadow-black"
                              placeholder={row.original.name}
                            />
                          </div>
                        </div>
                        <div className="w-[656px] h-[72px] gap-3 flex items-center justify-center">
                          <div className="w-[312px] h-[74px] gap-1">
                            <div className="w-[312px] h-[19px]">
                              <h1 className="font-semibold text-[16px] leading-[19.2px] text-[#0F172A]">
                                Email
                              </h1>
                            </div>
                            <div className="w-[312px] h-[48px]">
                              <input
                                type="text"
                                className="w-[312px] h-[48px] p-4 border-2 shadow-black"
                                placeholder={row.original.email}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-[656px] h-[72px] gap-3 flex items-center justify-center">
                        <div className="w-[312px] h-[72px] gap-1">
                          <div className="w-[312px] h-[19px]">
                            <h1 className="font-semibold text-[16px] leading-[19.2px] text-[#0F172A]">
                              Role
                            </h1>
                          </div>
                          <div className="w-[312px] h-[48px]">
                            <Select>
                              <SelectTrigger className="w-[312px] border-slate-200 text-[#334155] font-normal text-[16px] leading-[20px]">
                                <SelectValue placeholder={row.original.role} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="Option 1">
                                    Option 1
                                  </SelectItem>
                                  <SelectItem value="Option 2">
                                    Option 2
                                  </SelectItem>
                                  <SelectItem value="Option 3">
                                    Option 3
                                  </SelectItem>
                                  <SelectItem value="Option 4">
                                    Option 4
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="w-[312px] h-[72px] gap-1">
                          <div className="w-[312px] h-[19px]">
                            <h1 className="font-semibold text-[16px] leading-[19.2px] text-[#0F172A]">
                              Status
                            </h1>
                          </div>
                          <div className="w-[312px] h-[48px]">
                            <Select>
                              <SelectTrigger className="w-[312px] border-slate-200 text-[#334155] font-normal text-[16px] leading-[20px]">
                                <SelectValue
                                  placeholder={row.original.status}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="Option 1">
                                    Option 1
                                  </SelectItem>
                                  <SelectItem value="Option 2">
                                    Option 2
                                  </SelectItem>
                                  <SelectItem value="Option 3">
                                    Option 3
                                  </SelectItem>
                                  <SelectItem value="Option 4">
                                    Option 4
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogHeader>
                <DialogFooter className="w-full h-[58px] flex items-center justify-end gap-2">
                  <div className="flex items-center justify-center mr-10 gap-2">
                    <div>
                      <Button
                        variant={"ghost"}
                        className="bg-slate-200 hover:bg-slate-100 font-bold text-[16px] leading-[20px]"
                      >
                        Cancel
                      </Button>
                    </div>
                    <div>
                      <Button
                        variant={"ghost"}
                        className="bg-slate-200 hover:bg-slate-100 font-bold text-[16px] leading-[20px]"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    pageCount: Math.ceil(filteredData.length / pagination.pageSize),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="p-4 relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">Team members</h2>
          <span className="text-sm text-[#6941C6] font-semibold font-sans rounded-full bg-[#6941C6]/10 px-2 py-1">
            {data.length} users
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="text"
              className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg
              className="absolute left-3 top-2 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="20"
              height="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>
          <button type="button" className="flex items-center">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={<Filter />} />
              </SelectTrigger>
              <SelectContent className="bg-white w-[220px] h-[160px]">
                <SelectGroup>
                  <SelectLabel>
                    <div className="w-[191px] h-[26.15px] top-[12px] left-[12px] ">
                      <h1 className="font-normal text-[16px] leading-[18.38px] text-[#0F172A]">
                        Filters
                      </h1>
                    </div>
                  </SelectLabel>
                  <SelectItem value="Roles">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          <SelectItem value="productDesigner">
                            Product Designer
                          </SelectItem>
                          <SelectItem value="productManager">
                            Product Manager
                          </SelectItem>
                          <SelectItem value="FrontendDeveloper">
                            Frontend Developer
                          </SelectItem>
                          <SelectItem value="BackendDeveloper">
                            Backend Developer
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </SelectItem>
                  <SelectItem value="Teams">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Team" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="product">Product</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </button>
          <Button
            variant="default"
            className="px-4 py-2 font-sans font-bold bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm"
          >
            + Add Member
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => handleRowClick(row.original)}
                className="cursor-pointer hover:bg-gray-50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="py-3 flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {table.getState().pagination.pageIndex + 1}
              </span>{" "}
              to <span className="font-medium">{table.getPageCount()}</span> of{" "}
              <span className="font-medium">{data.length}</span> results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                {/* Heroicon name: solid/chevron-left */}
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              {/* Pagination numbers */}
              {table.getPageOptions().map((page) => (
                <button
                  key={page}
                  onClick={() => table.setPageIndex(page)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    page === table.getState().pagination.pageIndex
                      ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                      : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {page + 1}
                </button>
              ))}
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                {/* Heroicon name: solid/chevron-right */}
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
      {selectedUser && (
        <SidePane user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default Table;
