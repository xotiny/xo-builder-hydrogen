import type {
  ActionFunction,
  ActionFunctionArgs,
} from '@remix-run/server-runtime';
import {json} from '@remix-run/server-runtime';

import type {CustomerCreateMutation} from 'storefrontapi.generated';

const CUSTOMER_CREATE = `#graphql
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        firstName
        lastName
        email
        phone
        acceptsMarketing
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
` as const;

export const action: ActionFunction = async ({
  request,
  context,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get('contact[email]') ?? ('' as string);
  const firstName = formData.get('contact[first_name]') ?? ('' as string);
  const lastName = formData.get('contact[last_name]') ?? ('' as string);
  const {customerCreate, errors: queryErrors} =
    await context.storefront.mutate<CustomerCreateMutation>(CUSTOMER_CREATE, {
      variables: {
        input: {email, firstName, lastName, password: '5hopify'},
      },
    });

  const customer = customerCreate?.customer;
  const customerUserErrors = customerCreate?.customerUserErrors;

  if (queryErrors?.length) {
    return json(
      {
        errors: queryErrors,
        errorMessage: 'Internal server error!',
        ok: false,
      },
      {status: 500},
    );
  }
  if (customerUserErrors?.length) {
    return json(
      {
        errors: customerUserErrors,
        errorMessage: customerUserErrors?.[0]?.message,
        ok: false,
      },
      {status: 500},
    );
  }
  if (customer) {
    return json({customer, ok: true}, {status: 201});
  }
  return json(
    {
      errorMessage: 'Something went wrong! Please try again later.',
      ok: false,
    },
    {status: 500},
  );
};

export type CustomerApiPlayLoad = {
  ok: boolean;
  customer?:
    | NonNullable<CustomerCreateMutation['customerCreate']>['customer']
    | null;
  errors?: any[];
  errorMessage?: string;
};
