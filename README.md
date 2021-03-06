# Brizy Milestone Data
Action to get milestone data
It will also extract the declared fields (see the format below) from the description

The field format:

Field1: value-1

Field2: value-2

Field3: value-3


The field key must be an identifier and can be placed anywhere in the description.


## Pre-requisites

Create a workflow .yml file in your .github/workflows directory. An example workflow is available below. For more information, reference the GitHub Help Documentation for Creating a workflow file.

## Inputs

`repository`: Github repository. (xxx/sssss)

`milestone`: Milestone id (**required**)

## Outputs

`data`: Milestone data JSON.


## Example

```yaml
- name: Get milestone data
  uses: bagrinsergiu/brizy-milestone-data@master
  id: milestone
  env:
    GITHUB_TOKEN: ${{ github.token }}
  with:
    repository: ${{ github.repository }}
    milestone: 1

- name: Debug milestone 1
  run: echo ${{ steps.milestone.outputs.title }}
- name: Debug milestone 2       
  run: echo ${{ steps.milestone.outputs.description }}
- name: Debug milestone 3
  run: echo ${{ steps.milestone.outputs.Field1 }}
- name: Debug milestone 4       
  run: echo ${{ steps.milestone.outputs.Field2 }}
```
