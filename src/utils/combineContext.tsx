type ProviderComponent = React.ComponentType<{ children: React.ReactNode }>;

export default function combineContext(...providers: ProviderComponent[]) {
  /**
   * This combines multiple context provider together and returns a single context provider
   */

  return function CombinedProvider({ children }: { children: React.ReactNode }) {
    return providers.reduceRight((accumulator, CurrentProvider) => {
      return <CurrentProvider>{accumulator}</CurrentProvider>;
    }, children);
  };
}

/**
 * <A>
 *  <B>
 *      <C>
 *          <D>
 *          {children}
 *         </D>
 *      </C>
 *   </B>
 * </A>
 */

/**
 * <Combined>
 * {children}
 * </Combined>
 */
