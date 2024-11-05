export type Section = {
    id: string,
    parent?: string,
    title: string,
    permittedUsers: string[],
}

export type SectionWithChildren = Section & {
    children: SectionWithChildren[];
  };